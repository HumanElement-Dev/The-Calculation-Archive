// Shared 4-function calculator logic
// Usage: new Calc('displayElementId')

class Calc {
  constructor(displayId) {
    this.display = document.getElementById(displayId);
    this.fresh = true; // next digit replaces display
  }

  press(symbol) {
    if (this.fresh && /\d|\./.test(symbol)) {
      this.display.value = symbol;
      this.fresh = false;
    } else if (this.fresh && /[+\-*/]/.test(symbol)) {
      // operator after result — chain
      this.fresh = false;
      this.display.value += symbol;
    } else {
      if (this.display.value === '0' && /\d/.test(symbol)) {
        this.display.value = symbol;
      } else {
        this.display.value += symbol;
      }
    }
  }

  equals() {
    try {
      const result = Function('"use strict"; return (' + this.display.value + ')')();
      this.display.value = parseFloat(result.toPrecision(10)).toString();
      this.fresh = true;
    } catch {
      this.display.value = 'Error';
      this.fresh = true;
    }
  }

  clear() {
    this.display.value = '0';
    this.fresh = false;
  }
}
