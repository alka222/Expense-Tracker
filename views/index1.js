const myForm = document.getElementById('my-form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');

const btn = document.getElementById('btn');


window.addEventListener('DOMContentLoaded', () => {

    async function gettingData(){

        try{

            const getData = await new Promise((resolve, reject) => {

                axios.get('http://localhost:3000/expense/expenses')
                .then((response) => {
                console.log(response);
        
                    for(let i=0; i< response.data.length; i++){
                        showExpenses(response.data[i]);
                    }
                })
                resolve('Got the data');
            })

        }

        catch(err){
            console.log(err);
        } 

    }

    gettingData();
})



myForm.addEventListener('submit', addForm)

async function addForm(e){

    const saveData = await new Promise((resolve, reject) => {

        try{

            e.preventDefault();

        let myExpenses = {
            amount : amountInput.value,
            description : descriptionInput.value,
            category : categoryInput.value
        }

        // console.log(myExpenses);
        let serilized_Obj = JSON.stringify(myExpenses);

        axios.post('http://localhost:3000/expense/add-expense',myExpenses)
        .then((response) => {
            console.log(response.data.userExpense);
            showExpenses(response.data.userExpense);
        })
        .catch((err) => console.log(err))

        amountInput.value ='';
        descriptionInput.value= '';
        categoryInput.value= '';

        // showExpenses(myExpenses)
        }

        catch(err){
            console.log(err)
        }
  })

}

function showExpenses(user){

    console.log(user);

    const parentEle = document.getElementById('expenses');
    const childEle = `<li id='${user.id}'> ${user.amount} : ${user.description} : ${user.category}
                        <button onclick = updateExpense('${user.amount}','${user.description}','${user.category}','${user.id}')>Edit</button>
                        <button onclick = deleteExpense('${user.id}')> Delete </button>
                        </li>`

    parentEle.innerHTML = parentEle.innerHTML + childEle;

}

async function deleteExpense(userId){

    const deletingUser = await new Promise((resolve,reject) => {

        try{
            axios.post(`http://localhost:3000/expense/delete-expense/${userId}`)
            .then(() => {
                // console.log(' id ' + userId + ' expense deleted ');
                removeExpenseFromScreen(userId);
            })
            .catch((err) => console.log(err));

            // resolve('Deleted');
            // removeExpenseFromScreen(userId);
        }

        catch(err){
            console.log(err)
        }
        

    })
}


function removeExpenseFromScreen(userId){

    let parentNode = document.getElementById('expenses');
    let childNodeToBeDeleted = document.getElementById(userId);

    console.log(childNodeToBeDeleted);
    if(childNodeToBeDeleted){

        parentNode.removeChild(childNodeToBeDeleted);
     }
}


// function updateExpense(amount, description, category, userId){

//     document.getElementById('amount').value = amount;
//     document.getElementById('description').value = description;
//     document.getElementById('category').value = category;

//     deleteExpense(userId);
// }