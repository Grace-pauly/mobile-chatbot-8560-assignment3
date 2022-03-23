const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    PRODUCT: Symbol("product"),
    TYPE: Symbol("type"),
    EXTRAS: Symbol("extras")
});

const TAX = 0.10;

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sHardware = "";
        this.sProduct = "";
        this.sType = "";
        this.sExtras = "";
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.PRODUCT;
                aReturn.push("Welcome to Grace's Home Hardware Store.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/help/${this.sNumber}/`);
                aReturn.push(`${this.sUrl}/pdf/${this.sNumber}/`);

                if (sInput.toLowerCase() == "clean") {
                    this.sHardware = "cleaning";
                } else if (sInput.toLowerCase() == "electronic") {
                    this.sHardware = "electronics";
                } else {
                    this.stateCur = OrderState.WELCOMING;
                    aReturn.push("Please type CLEAN if you want cleaning product or ELECTRONIC if you have a electronic.");
                    break;
                }
                if (this.sHardware == "cleaning") {
                    aReturn.push("Would you like to buy BROOM or SNOW SHOVEL?");
                } else {
                    aReturn.push("Would you like to buy LIGHT BULB or FAN?");
                }

                break;
            case OrderState.PRODUCT:
                if (this.sHardware === "cleaning") {
                    if (sInput.toLowerCase() != "broom" && sInput.toLowerCase() != "snow shovel") {
                        this.stateCur = OrderState.PRODUCT;
                        aReturn.push("Item not found. Please choose BROOM or SNOW SHOVEL!");
                        break;
                    }
                } else {
                    if (sInput.toLowerCase() != "light bulb" && sInput.toLowerCase() != "fan") {
                        this.stateCur = OrderState.PRODUCT;
                        aReturn.push("Item not found. Please choose LIGHT BULB or FAN!");
                        break;
                    }
                }
                this.sProduct = sInput;
                this.stateCur = OrderState.TYPE;
                aReturn.push("Would you like USED or NEW?");
                break;
            case OrderState.TYPE:
                if (sInput.toLowerCase() !== "used" && sInput.toLowerCase() !== "new") {
                    this.stateCur = OrderState.TYPE;
                    aReturn.push("Incorrect option. Please choose USED or NEW?");
                    break;
                }
                this.sType = sInput;
                this.stateCur = OrderState.EXTRAS;
                if (this.sHardware == "cleaning") {
                    aReturn.push("Would you like a DE-SCALER or CAR CLOTH along with it?");
                } else {
                    aReturn.push("Would you like a GEEKY HEADLAMP or TABLE LAMP with it?");
                }

                break;
            case OrderState.EXTRAS:
                if (this.sHardware == "cleaning") {
                    if (sInput.toLowerCase() != "de-scaler" && sInput.toLowerCase() != "car cloth") {
                        this.stateCur = OrderState.EXTRAS;
                        aReturn.push("Item not found. Please choose DE-SCALER or CAR CLOTH!");
                        break;
                    }
                } else {
                    if (sInput.toLowerCase() != "geeky headlamp" && sInput.toLowerCase() != "table lamp") {
                        this.stateCur = OrderState.EXTRAS;
                        aReturn.push("Item not found. Please choose GEEKY HEADLAMP or TABLE LAMP!");
                        break;
                    }
                }
                this.sExtras = sInput;
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sHardware} item ${this.sProduct} as a ${this.sType} product`);
                aReturn.push(this.sExtras);
                this.nTotal = 0;
                this.nFinalTotal = 0;
                if (this.sHardware == "cleaning" && this.sProduct.toLowerCase() == "broom") {
                    this.nTotal += 6.99;
                } else if (this.sHardware == "cleaning" && this.sProduct.toLowerCase() == "snow shovel") {
                    this.nTotal += 5.99
                } else if (this.sHardware == "electronics" && this.sProduct.toLowerCase() == "fan") {
                    this.nTotal += 7.99;
                } else if (this.sHardware == "electronics" && this.sProduct.toLowerCase() == "light bulb") {
                    this.nTotal += 4.99
                }
                if (this.sType.toLocaleLowerCase() === "new") {
                    this.nTotal += 1.99;
                }
                if (this.sExtras.toLocaleLowerCase() === "de-scaler") {
                    this.nTotal += 2.99;
                }
                else if (this.sExtras.toLocaleLowerCase() === "car cloth") {
                    this.nTotal += 1.99;
                }
                else if (this.sExtras.toLocaleLowerCase() === "table lamp") {
                    this.nTotal += 2.99;
                }
                else if (this.sExtras.toLocaleLowerCase() === "geeky headlamp") {
                    this.nTotal += 3.99;
                }
                this.nFinalTotal = this.nTotal;
                this.nFinalTotal += (this.nTotal*TAX);
               
                aReturn.push(`Your total comes to ${this.nTotal} and including tax is ${this.nFinalTotal}`);
                aReturn.push(`We will text you from 519-111-1111 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }

        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`
      <html>
      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="content-type">
          <style type="text/css">
              ol {
                  margin: 0;
                  padding: 0
              }
      
              table td,
              table th {
                  padding: 0
              }
      
              .c1 {
                  border-right-style: solid;
                  padding: 5pt 5pt 5pt 5pt;
                  border-bottom-color: #000000;
                  border-top-width: 1pt;
                  border-right-width: 1pt;
                  border-left-color: #000000;
                  vertical-align: top;
                  border-right-color: #000000;
                  border-left-width: 1pt;
                  border-top-style: solid;
                  border-left-style: solid;
                  border-bottom-width: 1pt;
                  width: 234pt;
                  border-top-color: #000000;
                  border-bottom-style: solid
              }
      
              .c13 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 36pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c0 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 26pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c2 {
                  color: #000000;
                  font-weight: 400;
                  text-decoration: none;
                  vertical-align: baseline;
                  font-size: 11pt;
                  font-family: "Arial";
                  font-style: normal
              }
      
              .c9 {
                  padding-top: 12pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left;
                  height: 11pt
              }
      
              .c12 {
                  padding-top: 12pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c3 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c10 {
                  padding-top: 0pt;
                  padding-bottom: 0pt;
                  line-height: 1.0;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c4 {
                  padding-top: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: right
              }
      
              .c8 {
                  padding-top: 0pt;
                  padding-bottom: 7pt;
                  line-height: 1.15;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .c11 {
                  border-spacing: 0;
                  border-collapse: collapse;
                  margin-right: auto
              }
      
              .c5 {
                  background-color: #ffffff;
                  max-width: 468pt;
                  padding: 72pt 72pt 72pt 72pt
              }
      
              .c6 {
                  height: 48.2pt
              }
      
              .c7 {
                  height: 52pt
              }
      
              .c15 {
                  font-size: 26pt
              }
      
              .c14 {
                  height: 11pt
              }
      
              .title {
                  padding-top: 0pt;
                  color: #000000;
                  font-size: 26pt;
                  padding-bottom: 3pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              .subtitle {
                  padding-top: 0pt;
                  color: #666666;
                  font-size: 15pt;
                  padding-bottom: 16pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              li {
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              p {
                  margin: 0;
                  color: #000000;
                  font-size: 11pt;
                  font-family: "Arial"
              }
      
              h1 {
                  padding-top: 20pt;
                  color: #000000;
                  font-size: 20pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h2 {
                  padding-top: 18pt;
                  color: #000000;
                  font-size: 16pt;
                  padding-bottom: 6pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h3 {
                  padding-top: 16pt;
                  color: #434343;
                  font-size: 14pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h4 {
                  padding-top: 14pt;
                  color: #666666;
                  font-size: 12pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h5 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
      
              h6 {
                  padding-top: 12pt;
                  color: #666666;
                  font-size: 11pt;
                  padding-bottom: 4pt;
                  font-family: "Arial";
                  line-height: 1.15;
                  page-break-after: avoid;
                  font-style: italic;
                  orphans: 2;
                  widows: 2;
                  text-align: left
              }
          </style>
      </head>
      
      <body class="c5">
          <p class="c3"><span
                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p class="c10"><span class="c0">For curbside pickup:</span></p>
          <p class="c12"><span class="c15">Text &ldquo;clean&rdquo; or &ldquo;electronic&rdquo; to </span><span
                  class="c13">519-111-1111</span></p>
          <p class="c9"><span class="c2"></span></p><a id="t.d97173251f8e8de98f4d2ef9884eaa81e39c959c"></a><a id="t.0"></a>
          <table class="c11">
              <tbody>
                  <tr class="c7">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Broom and Dustbin</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">$6.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c6">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Light-Bulb</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">$4.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c6">
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c8"><span class="c0">Fan</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                      <td class="c1" colspan="1" rowspan="1">
                          <p class="c4">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                  class="c0">$7.99</span></p>
                          <p class="c3"><span
                                  class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </p>
                      </td>
                  </tr>
                  <tr class="c6">
                  <td class="c1" colspan="1" rowspan="1">
                      <p class="c8"><span class="c0">Snow Shovel</span></p>
                      <p class="c3"><span
                              class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </p>
                  </td>
                  <td class="c1" colspan="1" rowspan="1">
                      <p class="c4">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                              class="c0">$5.99</span></p>
                      <p class="c3"><span
                              class="c2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </p>
                  </td>
              </tr>
              
              </tbody>
          </table>
          <p class="c9"><span class="c2"></span></p>
          <p class="c12"><span class="c0">We also have a selection of car cloth,geeky headlamp,ear bud, de-scalar for a kettle.</span></p>
          <p class="c3 c14"><span class="c2"></span></p>
      </body>
      
      </html>      `);

    }
}
