const colorInput = document.querySelector('.color-input input')
const weightInput = document.querySelector('.weight-input input')
const randomClrBtn = document.querySelector('.shuffle-icon')
const main = document.querySelector('.main')

const getValues = (color, weight = 10) => {
    const clr = new Values(color), { log } = console
   return clr.all(weight)
}   

let baseClr;
let weight = 10;
let copyIcons;

const changeWeight = () => {    
    weight = weightInput.value
    const vals = getValues(baseClr, Number(weight))
    
    let theme

    main.innerHTML = ''
        for (const v of vals) {
            if (v.type == 'tint' && v.weight > 56) {
                theme = 'isLight'
            }else theme = ''
            if (v.type == 'base') {
            let html = `<div style="background-color: #${v.hex};" class="base-clr color-container "> <p class="weight">${v.weight.toFixed(1)}%</p> <h2>#${v.hex}</h2> </div>`
            main.insertAdjacentHTML('beforeend', html)
            }else{
                let html = `<div style="background-color: #${v.hex};" class="color-container ${theme}"> <p class="weight">${v.weight.toFixed(1)}%</p> <h2>#${v.hex}</h2> <img src="./imgs/copy-icon.png" alt="Copy Color" role="button" class="copy-icon icon"></div>`
                main.insertAdjacentHTML('beforeend', html)
            }
        }

        copyIcons = document.querySelectorAll('.copy-icon')
         for (const icon of copyIcons) {
            icon.addEventListener('click', (e) => {
                const clickedColor = e.target.parentNode.children[1].textContent
                navigator.clipboard.writeText(clickedColor);
            })
        }
}

const displayColors = (color) => {
        baseClr = color
        const vals = getValues(baseClr, Number(weight))
        let theme
        main.innerHTML = ''
        for (const v of vals) {
            if (v.type == 'tint' && v.weight >= 56) {
                theme = 'isLight'
            }else theme = ''
            if (v.type == 'base') {
            let html = `<div style="background-color: #${v.hex};" class="base-clr color-container"><p class="weight">${v.weight.toFixed(1)}%</p> <h2>#${v.hex}</h2> </div>`
            document.querySelector('.main').insertAdjacentHTML('beforeend', html)
            }else{
                let html = `<div style="background-color: #${v.hex};" class="color-container ${theme}"><p class="weight">${v.weight.toFixed(1)}%</p> <h2>#${v.hex}</h2> <img src="./imgs/copy-icon.png" alt="Copy Color" role="button" class="copy-icon icon"</div>`
                document.querySelector('.main').insertAdjacentHTML('beforeend', html)
            }
        }
        copyIcons = document.querySelectorAll('.copy-icon')
        for (const icon of copyIcons) {
            icon.addEventListener('click', (e) => {
                const clickedColor = e.target.parentNode.children[1].textContent
                navigator.clipboard.writeText(clickedColor);
            })
        }
}


const randomClr = () => {
   // Generate a random number and convert it to hexadecimal string representation.
   let n = (Math.random() * 0xfffff * 1000000).toString(16);
   // Return the hexadecimal color code with '#' appended.
   return '#' + n.slice(0, 6)
}

const displayRandomColor = () => {
    baseClr = randomClr()
    displayColors(baseClr, Number(weight))
    colorInput.value = baseClr
}

colorInput.onkeydown = (e) => {
    if (e.keyCode == 13) {
        displayColors(colorInput.value)
    }
}

displayRandomColor()
 
randomClrBtn.addEventListener('click', displayRandomColor)
weightInput.addEventListener('input', changeWeight)

