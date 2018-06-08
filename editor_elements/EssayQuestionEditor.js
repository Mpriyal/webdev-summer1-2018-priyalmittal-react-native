import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput}
    from 'react-native-elements'
import EssayService from "../services/EssayService";

class EssayQuestionEditor extends React.Component {
    static navigationOptions = { title: "Essay"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            essayQuestion: {
                title: '',
                description: '',
                points: 0,
                type: 'Essay'}
        }
        this.essayQuestionService = EssayService.instance;
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId
        })
    }

    componentDidMount() {
        const examId = this.props.examId;
        this.setState({
            examId: examId
        })
    }

    updateTitle(title) {
        this.setState({essayQuestion: {title: title,
                description: this.state.essayQuestion.description,
                points: this.state.essayQuestion.points,
            type: this.state.essayQuestion.type}});
    }

    updateDescription(description) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: description,
                points: this.state.essayQuestion.points,
                type: this.state.essayQuestion.type}});
    }

    updatePoints(points) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: this.state.essayQuestion.description,
                points: points,
                type: this.state.essayQuestion.type}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createEssay(){
        this.essayQuestionService.createEssayQuestion(this.state.examId, this.state.essayQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId})
            });
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder={'Enter question title'}
                    onChangeText={
                    text => this.updateTitle(text)
                }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder={'Enter question description'}
                    onChangeText={
                    text => this.updateDescription(text)
                }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder={'Enter question points'}
                    onChangeText={
                    text => this.updatePoints(text)
                }/>

                <View style={{padding: 15}}>
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='save'
                                type='font-awesome'
                                onPress={() =>
                                {this.createEssay()}}
                            />
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='black'
                                name='times'
                                type='font-awesome'
                                onPress={() =>
                                    this.props.navigation
                                        .navigate("ExamQuestionList", {examId: this.state.examId})
                                }
                            />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text h2>{this.state.essayQuestion.title}</Text>
                <Text>{this.state.essayQuestion.description}</Text>
                <Text>{this.state.essayQuestion.points}</Text>
            </ScrollView>
        )
    }
}
export default EssayQuestionEditor;