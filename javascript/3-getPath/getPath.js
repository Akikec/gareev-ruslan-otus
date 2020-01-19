function getPath(argument) {
    let result = buildSelectors(argument);
    const parentElement = argument.parentElement;
    if(parentElement && parentElement.nodeName != "BODY")
    {
        result = getPath(parentElement) + " > " + result;       
    }   
    console.log(result);
    return result;
}

function buildSelectors(elemWithNode) {
    let nodeResult = elemWithNode.nodeName;
    if (elemWithNode.classList.length)
    {
        let selectorsList = (typeof(elemWithNode.className) === "string") ? elemWithNode.className : elemWithNode.classList.baseVal || "";
        let selectors = selectorsList.split(" ").join(".");
        if(selectors[0]  !== '.' && selectors.length > 1) selectors = "." + selectors;
        nodeResult = nodeResult + selectors; 
    }
    return nodeResult;
};