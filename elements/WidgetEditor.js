import React from 'react'
import {Picker, View} from 'react-native'
import AssignmentContainer from "./AssignmentContainer";
import ExamContainer from "./ExamContainer";

export default class WidgetEditor extends React.Component {
    static navigationOptions = { title: "Add Exam/Assignment"}
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            widgetType: 'Exam',
            lessonId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam('lessonId');
        this.setState({
            lessonId: lessonId
        })
    }

    render() {
        return(
            <View>
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value="Exam"
                                 label="Exam" />
                    <Picker.Item value="Assignment"
                                 label="Assignment" />
                </Picker>
                {this.state.widgetType === 'Exam' && <ExamContainer lessonId={this.state.lessonId}/>}
                {this.state.widgetType === 'Assignment' && <AssignmentContainer lessonId={this.state.lessonId}/>}
            </View>
        )
    }
}