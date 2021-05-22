const path = window.location.pathname
const pageName = path.split("/").pop()
const uppercasedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
let titleElement = document.getElementById('title')
titleElement.textContent = `Debt Collectors -${uppercasedPageName}-`