import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueFalseQuestionEditor from './editor_elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './editor_elements/MultipleChoiceQuestionEditor'
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import ExamQuestionList from './components/ExamQuestionList'
import WidgetEditor from "./editor_elements/WidgetEditor";
import 'es6-symbol/implement'
import AssignmentEditor from "./editor_elements/AssignmentEditor";
import ExamContainer from "./elements/ExamContainer";
import AssignmentContainer from "./elements/AssignmentContainer";
import UpdateTrueFalse from "./elements/UpdateTrueFalse";
import UpdateMultipleChoice from "./elements/UpdateMultipleChoice";
import EssayQuestionEditor from "./editor_elements/EssayQuestionEditor";
import UpdateEssay from "./elements/UpdateEssay";
import FillInTheBlankQuestionEditor from "./editor_elements/FillInTheBlanksQuestionEditor";
import UpdateFillInTheBlanks from "./elements/UpdateFillInTheBlanks";

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
            </ScrollView>
        )
    }
}



const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    WidgetEditor,
    ExamContainer,
    AssignmentContainer,
    ExamQuestionList,
    AssignmentEditor,
    TrueFalseQuestionEditor,
    UpdateTrueFalse,
    MultipleChoiceQuestionEditor,
    UpdateMultipleChoice,
    FillInTheBlankQuestionEditor,
    UpdateFillInTheBlanks,
    EssayQuestionEditor,
    UpdateEssay
});

export default App;

