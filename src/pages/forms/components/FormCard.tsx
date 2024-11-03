import { IconButton, Stack, Text } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { FormValues } from "../../../interfaces/Form";

const FormCard = ({ form }: { form: FormValues }) => {
  const handleDelete = async () => {
    if (form.id) {
      try {
        await deleteDoc(doc(db, "forms", form.id));
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
  };

  return (
    <Stack direction="column" alignItems="stretch" spacing={20}>
      <Stack justifyContent="space-between">
        {form.creator?.photo && (
          <img
            src={form.creator.photo}
            alt="Creator"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        )}
        <Text>
          {form.formValues?.startDate?.toDate().toLocaleDateString()} -{" "}
          {form.formValues?.endDate?.toDate().toLocaleDateString()}
        </Text>
      </Stack>
      <Stack justifyContent="space-between">
        <Text>{form.formValues?.location}</Text>
        <IconButton
          icon={<TrashIcon />}
          appearance="subtle"
          onClick={() => {
            handleDelete();
          }}
        />
      </Stack>
    </Stack>
  );
};

export default FormCard;
