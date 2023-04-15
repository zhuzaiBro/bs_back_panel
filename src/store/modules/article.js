import {
    defineStore
} from "pinia";

const defaultArticle = {
    author: null,
    content: "",
    createAt: "",
    description: "",
    from: null,
    id: 0,
    picUrl: "",
    source: null,
    title: "",
    url: "",
    visit: null,
}

const useArticleStore = defineStore("article", {
    state: () => ({
        chooseArticle: defaultArticle,
    }),
    actions: {
        setChooseArticle(article) {
            this.chooseArticle = article
        }
    }
})

export default useArticleStore;