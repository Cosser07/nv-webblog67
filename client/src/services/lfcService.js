import Api from '@/services/Api'
export default {
    index() {
        return Api().get('lfcs')
    },
    show(lfcId) {
        return Api().get('lfc/' + lfcId) // แก้ไขจาก 'lfc' เป็น 'lfcId'
    },
    post(lfc) {
        return Api().post('lfc', lfc)
    },
    put(lfc) {
        return Api().put('lfc/' + lfc.id, lfc)
    },
    delete(lfc) {
        return Api().delete('lfc/' + lfc.id)
    },
}
