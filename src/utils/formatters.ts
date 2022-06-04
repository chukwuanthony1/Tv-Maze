
export const removeHTMLFormatting = (str : string) => {
    return str.replace( /(<([^>]+)>)/ig, '')
}