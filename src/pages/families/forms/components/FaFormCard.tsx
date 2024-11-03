import { Stack, Text } from "rsuite";
import { Form } from "../../../../interfaces/Form";

interface FaFormCardProps {
  form: Form;
  onClick: () => void;
}

const FaFormCard = ({ form, onClick }: FaFormCardProps) => {
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={20}
      onClick={onClick}
    >
      <Stack justifyContent="space-between" alignItems="flex-start">
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
        <Text>{form.creator?.name}</Text>
      </Stack>
    </Stack>
  );
};

export default FaFormCard;
