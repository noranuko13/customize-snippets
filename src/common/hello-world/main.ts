{
  const message = 'Hello, World! Customize Snippets are now working!'

  const createDiv = () => {
    const e = document.createElement('div')
    e.setAttribute('id', 'csHw')
    e.classList.add('cs-hw')
    e.textContent = message
    return e
  }

  const execute = () => {
    document.querySelector('body')?.append(createDiv())
    alert(message)
    console.log(message)
  }

  execute()
}
