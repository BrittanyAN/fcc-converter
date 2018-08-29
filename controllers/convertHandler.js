/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result, regex, i, j;
   
    i = input.search(/[a-zA-Z]/);
    result = i > 0 ? input.slice(0, i) : '1'; // separates number from unit, returns 1 if no number is specified

    regex = /(\.\.+|\.\d+\.|\/\/+|\/\d+\.*\d*\/|[^\d\/\.])/; // no double decimal, no double fraction, no non-numbers/decimal/divide
    result = regex.test(result) ? "invalid number" : result; // only invalid numbers will pass the regex
    
    j = result.indexOf('/');
    if (result != "invalid number") {
      if (j == -1) {
        return parseFloat(result); // parse non fraction numbers
      } else {
        return parseFloat(result.slice(0,j)) / parseFloat(result.slice(j+1)); // handles number with fractions
      }
    } else {
      return result;
    }
    
  };
  
  this.getUnit = function(input) {
    var result, i;
    var acceptable = ['gal','l','mi','km','lbs','kg'];
    
    // separates unit from number
    i = input.search(/[a-zA-Z]/);
    result = input.slice(i);
    result = result.toLowerCase();
    
    // check for acceptable unit name
    if (acceptable.indexOf(result) == -1) {
        return 'invalid unit';
    } else {
      return result;
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    initUnit = initUnit.toLowerCase(); // ensure unit is lowercase for test
    
    switch (initUnit) {
      case "gal":
        result = "l";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit";
    }
        
        
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    unit = unit.toLowerCase(); // ensure unit is lowercase for test
    
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      default:
        result = "invalid unit";
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    // check for invalid number first, then invalid unit
    if (initNum == 'invalid number') {
      return 'invalid number';
    } else {
    
      switch (initUnit) {
        case "gal":
          result = initNum*galToL;
          break;
        case "l":
          result = initNum/galToL;
          break;
        case "lbs":
          result = initNum*lbsToKg;
          break;
        case "kg":
          result = initNum/lbsToKg;
          break;
        case "mi":
          result = initNum*miToKm;
          break;
        case "km":
          result = initNum/miToKm;
          break;
        default:
          result = "invalid unit";
      }

      return result;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    if (initNum == 'invalid number' && returnUnit == 'invalid unit') {
      result = 'invalid number and unit';
    } else if (initNum == 'invalid number') {
      result = 'invalid number';
    } else if (returnUnit == 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = initNum.toFixed(5) + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum.toFixed(5) + " " + this.spellOutUnit(returnUnit); 
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
