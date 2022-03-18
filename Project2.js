//JS Object format
var testScore = {
    id: 0,
    name: "",
    math: 0,
    physic: 0,
    chemistry: 0,
    average: "?",
};

//Objects array
const list = []

//Main function_Input information in table
function inputMarks(){
    //Input information into JS Object format
    testScore.name = document.getElementById("name").value;
    testScore.math = document.getElementById("math").value;
    testScore.physic = document.getElementById("physic").value;
    testScore.chemistry = document.getElementById("chemistry").value;

    //Condition to validate Input Field
    if(testScore.name.length >0 && testScore.math.length > 0 && testScore.physic.length >0 && testScore.chemistry.length > 0){
        //Condition to validate Input Field
        if(testScore.math <= 10 && testScore.math >=0 && testScore.physic <= 10 && testScore.physic >= 0 && testScore.chemistry <= 10 && testScore.chemistry >= 0){
            testScore.id++;
            const table = document.getElementById("table");
            //Loop through validated Information and append to table
            for (let i of Object.values(testScore)){
                const item = document.createElement('div');
                //Customize className to monitor table's rows
                item.className = `grid-item added ${testScore.id}`;
                item.innerHTML = `${i}`;
                table.append(item);
            }

            //Create a new Object each function's call and push it to Array to store
            var psuedo_testScore = {
                id: testScore.id,
                name: testScore.name,
                math: testScore.math,
                physic: testScore.physic,
                chemistry: testScore.chemistry,
                average: "?",
            };
            list.push(psuedo_testScore);

            //Clear out input form after finished
            document.getElementById("name").value = "";
            document.getElementById("math").value = "";
            document.getElementById("physic").value = "";
            document.getElementById("chemistry").value = "";

            //Disable buttons
            document.querySelector('#assessment').disabled = true;
            document.querySelector('#order').disabled = true;

        }
        else{
            alert("Xin hãy nhập điểm số đúng quy định!");
        }
    }
    else{
        alert("Xin hãy nhập đầy đủ thông tin!");
    }
}

//Average marks calculation
function averageScore(){
    //Condition to use function
    if (list.length > 0){
        for (i of list){
            //Get marks by rows and calculate
            const collection = document.getElementsByClassName(i.id);
            var mark1 = parseInt(i.math);
            var mark2 = parseInt(i.physic);
            var mark3 = parseInt(i.chemistry);
            let averageScore = (mark1+mark2+mark3)/3;
            i.average = averageScore
            collection[5].innerHTML = `${averageScore.toFixed(2)}`;
        }
        document.querySelector('#assessment').disabled = false;
    }
    else{
        alert('Xin hãy nhập tối thiểu thông tin của 1 học sinh!')
    }
}

//Label students according to their average score
function assessment(){
    //Loop through array
    for (i of list){
        const collection = document.getElementsByClassName(i.id);
        let averageScore = i.average;
        //Labeling
        for (c=0; c<=(collection.length-1); c++){
            if (averageScore >= 8){
                collection[c].style.backgroundColor = "green";
            }
            else if (averageScore >=5){
                collection[c].style.backgroundColor = "lightgreen";
            }
            else {
                collection[c].style.backgroundColor = "red";
            }
        }
    }
    if (list.length > 1){
        document.querySelector('#order').disabled = false;
    }
}

//Rearrage table by order
function orderlist(){
    const table = document.getElementById("table");
    const added = document.querySelectorAll(".added");
    added.forEach(e => {
        table.removeChild(e)
    });
    list.sort(function (a, b) {
        return b.average - a.average;
    });
    list.forEach(o => {
        for (let i of Object.values(o)){
            const item = document.createElement('div');
            //
            item.className = `grid-item added ${o.id}`;
            item.innerHTML = `${i}`;
            table.append(item);
        }
    });
    averageScore();
    assessment();
}