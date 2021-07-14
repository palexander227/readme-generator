import inquirer from "inquirer"
import * as fs from "fs"

let questions = [
    {
        name:"title",
        message:"What is the name of your application?",
        type:"input",
    },

    {
        name:"description",
        message:"Enter a short description of the project.",
        type:"input",
    },

    {
        name:"install",
        message:"How should the application be installed?",
        type:"input",
    },    
]

const formatted = ans =>{
    return(
`# ${ans.title}

${ans.description}

## Installation Instructions

${ans.install}

`
    )
}


inquirer.prompt(questions)
    .then((answers)=>{
        console.log(answers)
        fs.writeFile("readmeTest.md", formatted(answers), (err)=>{
            if(err){
                return console.log(`There was an error writing the file: ${err}`)
            }
            console.log("The file was saved.")
        })
    })
    .catch((error)=>{
        if(error.isTtyError){
            console.log("The prompt could not be rendered")
        }else{
            console.log(`There was and error: ${error}`)
        }
    })