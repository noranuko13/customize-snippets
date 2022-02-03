{
  const execute = () => {
    document.querySelectorAll('.highlight pre').forEach((pre) => {
      pre.classList?.add('notranslate')
    })
  }

  execute()
}
