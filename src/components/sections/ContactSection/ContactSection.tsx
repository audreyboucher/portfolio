import React, { useState, useEffect, FormEventHandler } from 'react';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

import { Button, Input } from '../../common/ui';
import Section from '../Section/Section';

import { startsWithVowel } from '../../../utils/strings';

import colors from '../../../styles/_colors.scss';
import styles from './ContactSection.module.scss';

enum Field {
  name = 'name',
  email = 'email address',
  message = 'message',
};

type Rule = {
  value?: any;
  result: boolean;
};

type Rules = {
  isEmpty?: Rule;
  hasLengthLowerThan?: Rule;
  hasLengthGreaterThan?: Rule;
  isValidEmail?: Rule;
};

type FieldsObject<T> = {
  [key in keyof typeof Field]: T;
};

type Fields = FieldsObject<string>;
type RulesList = FieldsObject<Rules>;

type RuleFunction<T> = {
  [key in keyof Rules]: (str: string, ...args: any) => T;
};

type RuleMessageGenerator = RuleFunction<string>;
type RuleChecker = RuleFunction<boolean>;

const ContactSection = () => {
  const clearedFields: Fields = { name: '', email: '', message: '' };

  const [fields, setFields] = useState<Fields>(clearedFields);
  const [errors, setErrors] = useState<Fields>(clearedFields);
  const [focusedInput, setFocusedInput] = useState<Field | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const resetForm = () => {
    setFields(clearedFields);
    setErrors(clearedFields);
    setFocusedInput(null);
  };

  const rules: RulesList = {
    name: {
      isEmpty: { result: false },
      hasLengthGreaterThan: { value: 3, result: true },
      hasLengthLowerThan: { value: 30, result: true },
    },
    email: {
      isEmpty: { result: false },
      hasLengthGreaterThan: { value: 10, result: true },
      hasLengthLowerThan: { value: 200, result: true },
      isValidEmail: { result: true },
    },
    message: {
      isEmpty: { result: false },
      hasLengthGreaterThan: { value: 20, result: true },
    },
  };

  const templateErrorMessages: RuleMessageGenerator = {
    isEmpty: (field: string): string => `Please provide a${startsWithVowel(field) ? 'n': ''} ${field}`,
    hasLengthGreaterThan: (field: string, n: number): string => `Your ${field} should be at least ${n} character${n > 1 ? 's' : ''} long`,
    hasLengthLowerThan: (field: string, n: number): string => `The provided ${field} is too long (${n} character${n > 1 ? 's' : ''} max)`,
    isValidEmail: (field: string): string => `The provided ${field} is invalid`,
  };

  const ruleChecker: RuleChecker = {
    isEmpty: (str: string): boolean => !str.trim().length,
    hasLengthLowerThan: (str: string, max: number): boolean => str.trim().length <= max,
    hasLengthGreaterThan: (str: string, min: number): boolean => str.trim().length >= min,
    isValidEmail: (email: string): boolean => /^([\w!#$%&'*+/=?^`{|}~-]+)(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email.trim()),
  };

  const checkInputs = (): boolean => !Object.keys(rules).reduce((acc, cur) => {
    const fieldName = cur as keyof typeof Field;

    const result = Object.keys(rules[fieldName]).find((key) => {
      const keyName = key as keyof Rules;
      const match = ruleChecker[keyName]!(fields[fieldName], rules[fieldName][keyName]?.value) === rules[fieldName][keyName]!.result;

      if (!match) {
        setErrors((tmp) => ({
          ...tmp,
          [fieldName]: templateErrorMessages[keyName]!(Field[fieldName], rules[fieldName][keyName]?.value)
        }));
      }

      return !match;
    });

    return result ? acc : acc + 1;
  }, 0);

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setErrors(clearedFields);

    if (!!checkInputs()) {
      axios
        .post(`http://localhost:8000/api/messages`, fields)
        .then(response => {
          console.log(response);
          setSuccess(true);
          resetForm();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (success) {
      const id = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(id);
    }
  }, [success]);

  return (
    <Section anchor="contact" background="secondary">
      <div className={styles.container}>
        <form onSubmit={submitForm}>
          <h4 className={styles.title}>Contact</h4>
          <p>Get in touch</p>

          { success && <p>Your message has been successfully sent. You should receive a confirmation email in no time!</p> }

          <div className={styles.inlineInputs}>
            <Input
              label="Name"
              type="text"
              value={fields.name}
              isFocused={focusedInput === Field.name || !!fields.name.length}
              error={errors.name}
              removeError={() => setErrors((errors) => ({ ...errors, name: clearedFields.name }))}
              onFocus={() => setFocusedInput(Field.name)}
              onBlur={() => setFocusedInput(null)}
              onChange={({ target: { value } }) => setFields((tmp) => ({ ...tmp, name: value }))}
              disabled
            />

            <Input
              label="Email"
              type="email"
              value={fields.email}
              isFocused={focusedInput === Field.email || !!fields.email.length}
              error={errors.email}
              removeError={() => setErrors((errors) => ({ ...errors, email: clearedFields.email }))}
              onFocus={() => setFocusedInput(Field.email)}
              onBlur={() => setFocusedInput(null)}
              onChange={({ target: { value } }) => setFields((tmp) => ({ ...tmp, email: value }))}
              disabled
            />
          </div>

          <Input
            label="Message"
            type="textarea"
            value={fields.message}
            isFocused={focusedInput === Field.message || !!fields.message.length}
            error={errors.message}
            removeError={() => setErrors((errors) => ({ ...errors, message: clearedFields.message }))}
            onFocus={() => setFocusedInput(Field.message)}
            onBlur={() => setFocusedInput(null)}
            onChange={({ target: { value } }) => setFields((tmp) => ({ ...tmp, message: value }))}
            disabled
          />

          <Button text="Submit now" type="submit" disabled />
        </form>

        <InlineWidget
          url="https://calendly.com/audreyboucher95/30min"
          pageSettings={{
            hideLandingPageDetails: true,
            backgroundColor: colors.calendly_background,
            primaryColor: colors.calendly_primary_color,
            textColor: colors.calendly_text
          }}
        />
      </div>
    </Section>
  );
};

export default ContactSection;
