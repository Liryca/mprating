export function createExcel(result, name) {
    const url = window.URL.createObjectURL(new Blob([result]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}`);
    document.body.appendChild(link);
    link.click();
}
