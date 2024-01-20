export default class GeneratorCSV {
    async generateCSV(data, fileName) {
        try {
            const columnHeaders = Object.keys(data[0]);
            const columnValues = data.map(row => Object.values(row));
            const csvContent = `${columnHeaders.join(",")}\n${columnValues.map(row => row.join(",")).join("\n")}`;
    
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            this.downloadFile(blob, fileName || "data.csv");
        } catch (e) {
            console.error(e);
        }
    }

    downloadFile(blob, fileName) {
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            console.error("Download de arquivo não suportado no navegador atual.");
        }
    }
}
