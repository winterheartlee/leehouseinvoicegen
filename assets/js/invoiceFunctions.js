$(document).ready(function () {

  // Multiply item price by quanitity and print result upon price field keyup
  $(document.body).on("keyup", ".price-input", function () {
    let quant = $(this).closest("tr").find(".quant-input").get(0).value;
    $(this).closest("tr").find(".amount-result").html(this.value * quant);
  });

  // Multiply item price by quanitity and print result upon quantity field keyup
  $(document.body).on("keyup", ".quant-input", function () {
    let price = $(this).closest("tr").find(".price-input").get(0).value;
    $(this).closest("tr").find(".amount-result").html(this.value * price);
  });

  // Add together all individual item prices to create pre-tax amount total
  $(document.body).on("keyup", ".quant-input, .price-input", function () {
    let itemTotals = document.getElementsByClassName("amount-result");
    let sum = 0;
    for (let i = 0; i < itemTotals.length; ++i) {
      sum += parseFloat(itemTotals[i].textContent);
    }
    $("#balance").html(sum);
    return fireTax()
  });

  // Fire amount total calculation again after row has been deleted
  function fireAmount() {
    let itemTotals = document.getElementsByClassName("amount-result");
    let sum = 0;
    for (let i = 0; i < itemTotals.length; i++) {
      sum += parseFloat(itemTotals[i].textContent);
    }
    $("#balance").html(sum);
    return fireTax()
  };

  // Calculate amount total with selected tax percentage when entering tax amount
  $(document.body).on("keyup", "#tax", function () {
    let taxVal = document.getElementById("tax").value;
    let balVal = document.getElementById("balance").textContent;
    $("#grand-total").html(parseFloat(balVal) * (1 + (parseFloat(taxVal) / 100)));
  });

  // Fire tax calculation without having to click on tax input
  function fireTax() {
    let taxVal = document.getElementById("tax").value;
    let balVal = document.getElementById("balance").textContent;
    $("#grand-total").html(parseFloat(balVal) * (1 + (parseFloat(taxVal) / 100)));
  }

  // Add new row to invoice
  document.getElementById("appendRow").onclick = function () {
    if (document.getElementById("item-table-id").rows.length < 16) {
      $("#item-table-id").find('tbody').append(`<tr>
  <td><input type="text" name="item-des" size="80"></td>
  <td><input type="text" name="item-price" class="price-input" size="8"></td>
  <td><input type="text" name="item-quant" class="quant-input" size="8" value="1">
  </td>
  <td class="amount-result"></td>
</tr>`);
    } else {
      alert("15 item row limit!");
    }
  };

  // Delete last row on invoice
  $("#removeRow").click(function () {
    $("#item-table-id tr:last").remove();
    return fireAmount()
  });
});