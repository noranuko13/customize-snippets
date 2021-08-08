{
  const Status = Object.freeze({
    All: 0,
    Open: 1,
    Closed: 2,
    Merged: 3
  })
  type StatusKey = keyof typeof Status
  type StatusValue = typeof Status[StatusKey]

  function getHref (value: StatusValue): string {
    const url = new URL(window.location.href)

    if (value === Status.All) {
      url.searchParams.delete('q.statusId')
      return url.toString()
    }

    url.searchParams.set('q.statusId', value.toString())
    return url.toString()
  }

  const createA = (key: string, value: StatusValue) => {
    const href = getHref(value)
    const e = document.createElement('a')
    e.classList.add('status', 'status--git-' + value.toString())
    e.textContent = key
    e.setAttribute('href', href)
    if (location.href === href) {
      e.classList.add('js-is-active')
    }
    return e
  }

  const createDiv = () => {
    const e = document.createElement('div')
    e.classList.add('cs-gprsn')
    for (const [key, value] of Object.entries(Status)) {
      e.append(createA(key, value))
    }
    return e
  }

  const execute = () => {
    const selectors: string = '.result-set__controller-actions'
    document.querySelector(selectors)?.append(createDiv())
  }

  if (/^\/git\/[\w-]+\/[\w-]+\/pullRequests$/.test(location.pathname)) {
    execute()
    console.log('backlog/git-pull-requests-status-nav')
  }
}
