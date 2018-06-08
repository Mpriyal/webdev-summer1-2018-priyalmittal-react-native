import 'es6-symbol/implement';
const TRUE_FALSE_URL_ID = 'http://localhost:8080/api/exam/EID/truefalse';
const TRUE_FALSE_URL = 'http://localhost:8080/api/truefalse';

let _singleton = Symbol();
export default class TrueFalseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TrueFalseService(_singleton);
        return this[_singleton]
    }

    findAllTrueFalseForExam(examId) {
        return fetch(
            TRUE_FALSE_URL_ID
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createTrueFalseQuestion(examId,trueFalse) {
        return fetch(TRUE_FALSE_URL_ID
                .replace('EID', examId),
            {
                body: JSON.stringify(trueFalse),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            {
                return response.json();
            })
    }

    updateTrueFalseQuestion(questionId, question) {
        console.log(questionId)
        return fetch(TRUE_FALSE_URL+'/'+ questionId,
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

    deleteTrueFalseQuestion(questionId) {
        return fetch(TRUE_FALSE_URL + '/' + questionId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
    }

}