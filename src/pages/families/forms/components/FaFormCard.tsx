import { Stack, Text } from "rsuite";
import { FormValues } from "../../../../interfaces/Form";

const FaFormCard = ({ form }: { form: FormValues }) => {
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
      </Stack>
    </Stack>
  );
};

export default FaFormCard;
