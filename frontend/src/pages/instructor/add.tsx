import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CourseData } from "@/models/course.model";
import {
  addCourse,
} from "@/services/serverService";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};

const Add = ({}: Props) => {
  const router = useRouter();

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
              เพิ่มรายวิชา
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="id_code"
              type="text"
              label="รหัสวิชา"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="ชื่อวิชา"
            />
           
          </CardContent>
          <CardActions>
            <Stack  direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
            <Button
              disabled={!isValid} 
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginRight: 1 }}
            >
              ตกลง
            </Button>
            <Link href="/instructor" passHref>
              <Button variant="outlined" fullWidth>
                ยกเลิก
              </Button>
            </Link>
            </Stack>
          </CardActions>
        </Card>
      </Form>
    );
  };

 

  const initialValues: CourseData = {
    id_code: "",
    name: "",
  };

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.id_code) errors.id_code = "Enter code";
          if (!values.name) errors.name = "Enter name";
          return errors;
        }}
        initialValues={initialValues}
        onSubmit={async (values:any, { setSubmitting }) => {
          await addCourse(values);
          router.push("/instructor");
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default withAuth(Add);
