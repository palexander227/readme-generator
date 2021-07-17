//We need to import these two "helpers" or we won't be able to get the code to work
import inquirer from "inquirer"
import * as fs from "fs"

//Setting up our questions routine.
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

    {
        name:"usage",
        message:"Enter the usage.",
        type:"input",
    },

    {
        name:"test",
        message:"How to run tests.",
        type:"input",
    },
    
    {
        name:"questions",
        message:"Enter the question.",
        type:"input",
    },
    
    {
        name:"contributing",
        message:"Steps to contribute:",
        type:"input",
    }, 
    
    {
        name:"license",
        message:"Enter the license.",
        type:"list",
        choices:[
            "CC", "GPL", "ISC", "MIT", "WTFPL", "NCSA"
        ]
    }, 
    
    {
        name:"github",
        message:"What is your Github username?",
        type:"input",
    },

    {
        name:"email",
        message:"What is your email?",
        type:"input",
    }
]

//Here is where we format our answers to get printed to a file according to the appropriate 
// markdown formalism. 

const formatted = ans =>{
    return(
`# ${ans.title}

![license badge](https://img.shields.io/badge/License-${ans.license}-blue)

${ans.description}

[Installation](#installation-instructions)  
[Usage](#usage)  
[Contributing](#contributing)  
[Questions](#questions)  
[Test](#test)    
[License](#license)  

## Installation Instructions

${ans.install}

## Usage 

${ans.usage}

## Contributing 

${ans.contributing}

## Questions

${ans.questions}

View Github issues at ${ans.github}/${ans.title}.

Contact me with questions at ${ans.email}.

## Test

${ans.test}

## License

${ans.license}

`
    )
}

//Get inquirer to track and log the answers. Give us an error message if inappropriate input.

inquirer.prompt(questions)
    .then((answers)=>{
        console.log(answers)
        fs.writeFile("README.md", formatted(answers), (err)=>{
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