import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { themable } from '../themes';

import Button from './Button';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.save = this.save.bind(this);
    this.reset = this.reset.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(text) {
    this.setState({text});
  }

  reset() {
    this.setState({text: ''});
  }

  save() {
    this.props.saveTodo(this.state.text);
  }

  render() {
    const { style, placeholderTextColor, textInputStyle } = this.props;
    const btnDisabled = this.state.text.trim().length === 0;
    return (
      <View style = { style }>
        <TextInput
          style={ textInputStyle }
          placeholder={ '输入新任务' }
          placeholderTextColor={ placeholderTextColor }
          onChangeText={ this.handleTextChange }
          onSubmitEditing={ this.reset }
          value={ this.state.text || '' }
        />

        <Button onPress={this.save} disabled={ btnDisabled }>保存</Button>
      </View>
    );
  }
}

const ThemableAddTodo = themable(AddTodo, (theme) => {
  const { styles, variables } = theme;
  return {
    placeholderTextColor: variables.colorPlaceHolderText,
    style: styles.todoEditForm,
    textInputStyle: styles.addTodoInput
  }
});

ThemableAddTodo.PropTypes = {
  saveTodo: PropTypes.func,
  onFinish: PropTypes.func
};

export default ThemableAddTodo;
