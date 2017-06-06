// runtime global

interface MyWindow extends Window {
    Promise: Promise<any>,
    $,
    jQuery,
    __REDUX_DEVTOOLS_EXTENSION__
}

declare var global: MyWindow

declare var require: {
    (id: string): any;
}

declare var module: {
    exports: any
}

declare var exports: any