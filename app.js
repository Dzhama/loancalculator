// LIsten for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.querySelector("#results").style.display = "none";

    //Show loader
    document.querySelector("#loading").style.display = "block";

    //setTimeout
    setTimeout(calculateResults, 2000)

    e.preventDefault();
});

//Calculate Results
function calculateResults() {
    console.log('Calculating');

    //UI VARS 

    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show results
        document.querySelector("#results").style.display = "block";
        //Hide loader
        document.querySelector("#loading").style.display = "none";
    }else {
        showError("Please check you number");
        //Hide loader
        document.querySelector("#loading").style.display = "none";
    }
}


// Check error 
function showError(error) {
    //create a div
    const errorDiv = document.createElement('div');

    //add class
    errorDiv.className = "alert alert-danger";

    //Create a text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert error about heading
    card.insertBefore(errorDiv, heading);

    // clear error after 2 seconds
    setTimeout(clearError, 2000);
}

//Clear error
function clearError() {
    document.querySelector(".alert").remove();
}