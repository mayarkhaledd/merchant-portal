import { Dispatch, SetStateAction } from "react";
import {
  Control,
  FormState,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { extraEventChannelsInitialValues } from "@ejada/screens/EventsManagement";
import { SelectSearchList } from "@ejada/screens";
export interface AddExtraEventFormProps {
  control: Control<extraEventChannelsInitialValues, any>;
  formState: FormState<extraEventChannelsInitialValues>;
  getValues: UseFormGetValues<extraEventChannelsInitialValues>;
  register: UseFormRegister<extraEventChannelsInitialValues>;
  channelList: SelectSearchList[];
  isEventChannelsSuccess: boolean;
  refetchChannels: (() => void) | undefined;
  selectedChannels: string[];
  setSelectedChannels: Dispatch<SetStateAction<string[]>>;
  reset: UseFormReset<extraEventChannelsInitialValues>;
  setValue: UseFormSetValue<extraEventChannelsInitialValues>;
  watch: UseFormWatch<extraEventChannelsInitialValues>;
  handleFormSubmit: () => Promise<void>;
  watchedChannels: string[];
}
