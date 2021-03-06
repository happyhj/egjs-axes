import Hammer from "hammerjs";
import {WheelInput} from "../../../src/inputType/WheelInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";

describe("WheelInput", () => {
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new WheelInput(sandbox());
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it("should check status after disconnect", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.disconnect();

      // Then
      expect(this.observer).to.be.not.exist;
      expect(this.inst.element).to.be.exist;
      expect(this._timer).to.be.not.exist;
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this._timer).to.be.not.exist;
      
      this.inst = null;
    });
  });
  describe("enable/disable", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new WheelInput(this.el);
      this.inst.mapAxes(["x"]);
      this.observer = {
        release() {},
        hold() {},
        change() {},
        options: {
          deceleration: 0.0001
        }
      };
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check value of `enable/disalbe` methods", () => {
      // Given
      // When
      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When
      this.inst.disable();

      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;

      // When (after connection)
      this.inst.connect(this.observer);
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;
    });    
  });
});
