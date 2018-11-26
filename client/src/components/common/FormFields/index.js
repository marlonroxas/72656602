import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Radio, Select, Checkbox, DatePicker} from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const {TextArea} = Input
const {RangePicker} = DatePicker

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
}

const FormField = (Component, withValue = true) => {
  const RenderField = ({input, meta, children, hasInlineLabel = true, hasFeedback = false, label, hasRequiredIndicator = false, ...rest}) => {
    const hasError = meta.touched && meta.invalid
    const layout = hasInlineLabel ? formItemLayout : {}
    const formLabel = (
      <Choose>
        <When condition={hasRequiredIndicator}>
          <span className='ant-form-item-required'>{label}</span>
        </When>
        <When condition={hasRequiredIndicator === false}>
          {label}
        </When>
      </Choose>
    )
  
    if (!withValue) {
      delete input.value
    }

    return (
      <FormItem
        {...layout}
        label={formLabel}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}>
        <Component {...input} {...rest} children={children} />
      </FormItem>
      )
  }

  RenderField.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    children: PropTypes.any,
    hasInlineLabel: PropTypes.bool.isRequired,
    hasFeedback: PropTypes.bool,
    hasRequiredIndicator: PropTypes.bool
  }

  RenderField.defaultProps = {
    label: '',
    children: null,
    hasFeedback: false,
    hasRequiredIndicator: false
  }

  return RenderField
}

FormField.PropTypes = {
  Component: PropTypes.Component
}

export const DisplayFormField = (props) => {
  return (
    <FormItem {...formItemLayout} {...props}>
      {props.children}
    </FormItem>
  )
}

DisplayFormField.propTypes = {
  children: PropTypes.node
}

DisplayFormField.defaultProps = {
  children: null
}

export const TailFormField = (props) => {
  return (
    <FormItem {...tailFormItemLayout}>
      {props.children}
    </FormItem>
  )
}

TailFormField.propTypes = {
  children: PropTypes.node
}

TailFormField.defaultProps = {
  children: null
}

export const AInput = FormField(Input)
export const ARadioGroup = FormField(RadioGroup)
export const ASelect = FormField(Select)
export const ACheckbox = FormField(Checkbox)
export const ATextarea = FormField(TextArea)
export const ADatePicker = FormField(DatePicker, false)
export const ARangePicker = FormField(RangePicker, false)
