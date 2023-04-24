
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CourseData } from "@/models/course.model";
import {  updateCourse } from "@/services/serverService";

import { productImageURL } from "@/utils/commonUtil";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { getSession } from "@/store/slices/userSlice";
import { getCourseById, getCourses } from "@/store/slices/courseSlice";
import { useSelector } from "react-redux";

type Props = {
  course: string | undefined
}



const Edit = ({ course }: Props) => {
  // const courseList = useSelector(getCourseById(course));
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // React.useEffect(() => {
  //   dispatch(getCourses());
  //   dispatch(getSession());
  // }, [dispatch]);
 
  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<CourseData>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Edit Course
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="id_code"
              type="text"
              label="id_code"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            /> 
          </CardContent>
          <CardActions>
            <Button  disabled={!isValid} fullWidth variant="contained"color="primary" type="submit" sx={{ marginRight: 1 }} >
              Edit
            </Button>
            <Link href="/Instructor" passHref> 
            <Button variant="outlined" fullWidth> 
             Cancl 
             </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    );
  };
 

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.id_code) errors.id_code = "id_code";
          if (!values.name)  errors.name = "Enter name";
          return errors;
        }}
        initialValues={course!}
        onSubmit={async (values, { setSubmitting }) => {
          let data = new FormData();
          data.append("id", String(values.id));
          data.append("id_code", values.id_code);
          data.append("name", values.name);
          await updateCourse(data);
          router.push("/stock");
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default withAuth(Edit);
 


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  if (id) {
    const course =  id
    console.log(course)
    return {
      props: {
        course,
      },
    };
  } else {
    return { props: {} };
  }
};
