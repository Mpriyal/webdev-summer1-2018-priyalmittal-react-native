import 'es6-symbol/implement';

const ESSAY_API_URL =
    'http://localhost:8080/api/exam/EID/essay';

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

    findAllEssayForExam(examId) {
        return fetch(
            ESSAY_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    createEssay(examId,essay) {
        return fetch(ESSAY_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(essay),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    // deleteTrueFalse(questionId) {
    //     return fetch(ASSIGNMENT_API_URL + '/' + questionId,
    //         {
    //             method: 'DELETE'
    //         })
    //         .then(function (response)
    //         { return response; })
    // }

}