import 'es6-symbol/implement';
const ESSAY_URL_BY_ID = 'http://localhost:8080/api/exam/EID/essay';
const ESSAY_URL = 'http://localhost:8080/api/essay';

let _singleton = Symbol();
export default class EssayService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    findAllMultiChoiceForExam(examId) {
        return fetch(
            ESSAY_URL_BY_ID
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createEssayQuestion(examId,essay) {
        return fetch(ESSAY_URL_BY_ID
                .replace('EID', examId),
            {
                body: JSON.stringify(essay),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response.json();
            })
    }

    updateEssayQuestion(questionId, question) {
        console.log(questionId)
        return fetch(ESSAY_URL+'/'+ questionId,
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            {
                return response.json();
            })
    }

    deleteEssayQuestion(questionId) {
        return fetch(ESSAY_URL + '/' + questionId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
    }

}