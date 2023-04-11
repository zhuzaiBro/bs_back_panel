import { defineStore } from "pinia";



const useArticleStore = defineStore("article", {
    state: () => ({ chooseArticle: {}, }),
    actions: {
        setChooseArticle(article) {
            this.chooseArticle = article
        }
    }
})