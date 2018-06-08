import React from 'react'
import {Picker, ScrollView, Text, View} from 'react-native'
import AssignmentContainer from "../elements/AssignmentContainer";
import ExamContainer from "../elements/ExamContainer";

export default class WidgetEditor extends React.Component {
    static navigationOptions = {title: "Add Widget"}

    constructor(props) {
        super(props);
        this.state = {
            lessonId: 1,
            text: '',
            widgetType: 'Exam'
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam('lessonId');
        this.setState({
            lessonId: lessonId,
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{justifyContent:"center", alignItems:"center", marginTop:50}}>
                    <Text h3>Choose a widget type:</Text>
                </View>
                <Picker
                    onValueChange={(value) =>
                        this.setState({widgetType: value})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value="Exam"
                                 label="Exam"/>
                    <Picker.Item value="Assignment"
                                 label="Assignment"/>
                </Picker>
                {this.state.widgetType === 'Exam' &&
                <ExamContainer lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.widgetType === 'Assignment' &&
                <AssignmentContainer lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
            </ScrollView>
        )
    }
}