import 'es6-symbol/implement';

const FILL_IN_THE_BLANK_URL_ID =
    'http://localhost:8080/api/exam/EID/blanks';
const FILL_IN_THE_BLANK_URL =
    'http://localhost:8080/api/blanks';

let _singleton = Symbol();
export default class FillInTheBlankService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new FillInTheBlankService(_singleton);
        return this[_singleton]
    }

    findAllFillInTheBlankQuestionForExam(examId) {
        return fetch(
            FILL_IN_THE_BLANK_URL_ID
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createFillInTheBlankQuestion(examId,blanks) {
        return fetch(FILL_IN_THE_BLANK_URL_ID
                .replace('EID', examId),
            {
                body: JSON.stringify(blanks),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    updateFillInTheBlankQuestion(questionId, question) {
        return fetch(FILL_IN_THE_BLANK_URL+'/'+ questionId,
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
            .then(function (response)
            {
                return response.json();
            })
            .catch(function(error) {
                console.log(error.message);
            })
    }

    deleteFillInTheBlankQuestion(questionId) {
        return fetch(FILL_IN_THE_BLANK_URL + '/' + questionId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            {
                return response;
            })
    }

}