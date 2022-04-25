import * as wjcCore from '@grapecity/wijmo';
export class DataService {
    static init(ready) {
        wjcCore.httpRequest('assets/popUS.json', {
            success: xhr => {
                JSON.parse(xhr.responseText).forEach(el => DataService.dataMap.set(el.state, el));
                ready();
            }
        });
    }
    static getData(code) {
        return DataService.dataMap.get(code);
    }
}
DataService.dataMap = new Map();
