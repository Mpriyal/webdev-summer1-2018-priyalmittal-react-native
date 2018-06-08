import 'es6-symbol/implement';

const MULTI_CHOICE_URL_ID = 'http://localhost:8080/api/exam/EID/choice';
const MULTI_CHOICE_URL = 'http://localhost:8080/api/choice';

let _singleton = Symbol();
export default class MultipleChoiceService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MultipleChoiceService(_singleton);
        return this[_singleton]
    }

    findAllMultiChoiceForExam(examId) {
        return fetch(
            MULTI_CHOICE_URL_ID
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createMultiChoiceQuestion(examId,choice) {
        return fetch(MULTI_CHOICE_URL_ID
                .replace('EID', examId),
            {
                body: JSON.stringify(choice),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response.json();
            })
    }

    updateMultipleChoiceQuestion(questionId, question) {
        console.log(questionId)
        return fetch(MULTI_CHOICE_URL+'/'+ questionId,
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

    deleteMultipleChoiceQuestion(questionId) {
        return fetch(MULTI_CHOICE_URL + '/' + questionId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
    }

}