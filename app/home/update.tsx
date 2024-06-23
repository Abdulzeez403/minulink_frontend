import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../components/modal"; // Adjust the import path as necessary
import { Url } from "@/app/types";

interface UpdateFormProps {
    initialValues: Url;
    onSubmit: (values: Url) => void;
    isOpen: boolean;
    closeModal: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ initialValues, onSubmit, isOpen, closeModal }) => {
    const validationSchema = Yup.object({
        originalUrl: Yup.string().url("Invalid URL format").required("Required"),
        shortUrl: Yup.string().required("Required"),
        status: Yup.string().oneOf(["active", "inactive"]).required("Required"),
    });

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                    closeModal();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="originalUrl">Original URL</label>
                            <Field name="originalUrl" type="text" className="w-full p-2 mt-2 border border-gray-300 rounded" />
                            <ErrorMessage name="originalUrl" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shortUrl">Short URL</label>
                            <Field name="shortUrl" type="text" className="w-full p-2 mt-2 border border-gray-300 rounded" />
                            <ErrorMessage name="shortUrl" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status">Status</label>
                            <Field as="select" name="status" className="w-full p-2 mt-2 border border-gray-300 rounded">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={isSubmitting}
                            >
                                Update
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default UpdateForm;
