import * as Blockly from "blockly"


class CustomConstantsProvider extends Blockly.blockRendering.ConstantProvider {
    constructor() {
        super();


    this.NOTCH_WIDTH = 5;

    this.NOTCH_HEIGHT = 20;

    this.CORNER_RADIUS = 2;

    }

    init() {
        super.init();
        this.RECT_INPUT_OUTPUT = this.makeRectangularInputConn();
    }

    // @ts-ignore
    shapeFor(connection) {
        const checks = connection.getCheck();
        switch (connection.type) {
            case Blockly.INPUT_VALUE:
            case Blockly.OUTPUT_VALUE:
                if (checks && checks.indexOf("statement") != -1) {
                    return this.PUZZLE_TAB;
                }
                return this.PUZZLE_TAB;
            case Blockly.PREVIOUS_STATEMENT:
            case Blockly.NEXT_STATEMENT:
                return this.NOTCH;
            default:
                throw Error("Uknown Type");
        }
    }

    makeRectangularInputConn() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;

        function makeMainPath(up) {
            return Blockly.utils.svgPaths.line(
                [
                    Blockly.utils.svgPaths.point(0,0)
                ]);
        }

        const pathUp = makeMainPath(1);
        const pathDown = makeMainPath(-1);

        return {
            width: width,
            height: height,
            pathDown: pathDown,
            pathUp: pathUp
        };
    }
};

export class CustomRenderer extends Blockly.blockRendering.Renderer {
    constructor(name) {
        super(name);
    }

    // @ts-ignore
    makeConstants_() {
        return new CustomConstantsProvider();
    }
};