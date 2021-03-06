import * as avalon from 'avalon2';
import * as bootbox from 'bootbox';
import { parseSlotToVModel } from '../../ane-util';
import * as $ from 'jquery';

avalon.component('ms-dialog', {
    template: '<div style="display: none"><slot name="header" /><slot name="body"/></div>',
    defaults: {
        body: 'blank',
        $dialog: null,
        show: false,
        size: '',
        uploading: false,
        $innerVm: '',
        onOk() {},
        onCancel() {},
        onInit(event) {
            var vm = event.vmodel;
            vm.$watch('show', (newV) => {
                if (newV) {
                    vm.$dialog = bootbox.dialog({
                        message: vm.body,
                        title: '{{title}}',
                        size: vm.size,
                        buttons: {
                            save: {
                                label: '保存',
                                className: 'btn-primary',
                                callback() {
                                    vm.onOk();
                                    return false;
                                }
                            },
                            cancel: {
                                label: '取消',
                                className: 'btn-default',
                                callback() {
                                    vm.onCancel();
                                }
                            }
                        }
                    }).on('hidden.bs.modal', (e) => {
                        setTimeout(() => {
                            if ($('.modal.in').length) {
                                $('body').addClass('modal-open');
                            } else {
                                $('body').removeClass('modal-open');
                            }
                        }, 100);
                    })
                    .on('shown.bs.modal', () => {
                        
                    });
                    vm.$dialog.find('.modal-content').attr(':controller', this.$innerVm);
                    avalon.scan(vm.$dialog.get(0));
                } else {
                    if (vm.$dialog) {
                        vm.$dialog.find('.bootbox-close-button').trigger('click');
                    }
                }
            });
        },
        onReady(event) {
            parseSlotToVModel(this);
            this.show && this.$fire('show', true);
        },
        onDispose(event) {
        }
    }
});