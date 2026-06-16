import { Capability } from "@/app/lib/definitions";
import { Checkbox, CheckboxGroup, Field, Fieldset } from "@base-ui/react";

export function CapabilitiesForm({ capabilities }: { capabilities: Capability[] }) {
    return (<div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
        <Field.Root name="capabilities">
            <Fieldset.Root render={<CheckboxGroup defaultValue={[]} />}>
                <Fieldset.Legend className="mb-2 text-xs text-gray-700">Capabilities</Fieldset.Legend>
                <div className="flex gap-x-4 gap-y-3 flex-wrap">
                    {capabilities && capabilities.map(({ id, name }) => {
                        return (
                            <Field.Item key={id} className="flex">
                                <Field.Label className="text-xs border transition has-checked:bg-gray-200 has-checked:font-medium has-checked:text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1">
                                    <Checkbox.Root value={id}>
                                    </Checkbox.Root>
                                    {name}
                                </Field.Label>
                            </Field.Item>
                        );
                    })}
                </div>
            </Fieldset.Root>
        </Field.Root>
    </div>)
}