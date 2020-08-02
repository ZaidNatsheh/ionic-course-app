import React, { useState } from "react";
import CoursesContext, { Course } from "./courses-context";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_COURSE = gql`
  mutation MyMutation($title: String!, $date: date!) {
    insert_courses(objects: { title: $title, enrolled: $date }) {
      affected_rows
    }
  }
`;

const ADD_GOAL = gql`
  mutation addGoal($id: uuid!, $text: String!) {
    insert_goals(objects: { course_id: $id, text: $text }) {
      affected_rows
    }
  }
`;
const Delete_Goal = gql`
  mutation MyMutation($goalId: uuid!, $courseId: uuid!) {
    delete_goals(
      where: { id: { _eq: $goalId }, course_id: { _eq: $courseId } }
    ) {
      affected_rows
    }
  }
`;
const UPDATE_GOAL = gql`
  mutation updateGoal($goalId: uuid!, $courseId: uuid!, $newText: String!) {
    update_goals(
      where: { id: { _eq: $goalId }, course_id: { _eq: $courseId } }
      _set: { text: $newText }
    ) {
      affected_rows
    }
  }
`;

const Filter_Goals = gql`
  mutation MyMutation($courseId: uuid!, $isIncluded: Boolean!) {
    update_courses(
      _set: { isIncluded: $isIncluded }
      where: { id: { _eq: $courseId } }
    ) {
      affected_rows
    }
  }
`;
const CoursesContextProvider: React.FC = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [AddCourse] = useMutation(ADD_COURSE, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("add course  completed!"),
  });

  const [AddGoal] = useMutation(ADD_GOAL, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("add goal  completed!"),
  });
  const [remove] = useMutation(Delete_Goal, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("delete goal  completed!"),
  });
  const [update] = useMutation(UPDATE_GOAL, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("update goal  completed!"),
  });
  const [filterGoals] = useMutation(Filter_Goals, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("update goal  completed!"),
  });
  const addCourse = (title: string, date: Date) => {
    AddCourse({ variables: { title, date } });
    setCourses([]);
  };

  const addGoal = (courseId: string, text: string) => {
    AddGoal({ variables: { id: courseId, text: text } });
  };

  const deleteGoal = (goalId: string, courseId: string) => {
    console.log("start Delteing from mutation");
    console.log(" goalId from ctx : ", goalId);
    console.log(" courseId from ctx : ", courseId);

    remove({ variables: { goalId, courseId } });
  };
  const updateGoal = (courseId: string, goalId: string, newText: string) => {
    update({
      variables: { goalId: goalId, courseId: courseId, newText: newText },
    });
  };
  const changeCourseFilter = (courseId: string, isIncluded: boolean) => {
    filterGoals({ variables: { courseId: courseId, isIncluded: isIncluded } });
  };
  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        addGoal,
        deleteGoal,
        updateGoal,
        changeCourseFilter,
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
