function getPath(argument) {

    var nodeFunc = function(elemWithNode) {
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

    let parentElement = argument.parentElement;
    let result = nodeFunc(argument);
    while(parentElement && parentElement.nodeName != "BODY")
    {
        let nodeParentSelectors = nodeFunc(parentElement);
        result = nodeParentSelectors + " > "+ result;
        parentElement = parentElement.parentElement;
    }   
    console.log(result);
    return result;
}