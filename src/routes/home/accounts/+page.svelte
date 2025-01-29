<script lang="ts">
    import {Button, buttonVariants} from "$lib/components/ui/button/index.js";

    // noinspection ES6UnusedImports
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    // noinspection ES6UnusedImports
    import * as Card from "$lib/components/ui/card/index.js";
    // noinspection ES6UnusedImports
    import * as Form from "$lib/components/ui/form/index.js";

    import {Input} from "$lib/components/ui/input/index.js";

    import {type Infer, superForm, type SuperValidated} from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {accountCreateFormSchema, type AccountCreateFormSchema} from "./schema";

    let {data}: { data: { form: SuperValidated<Infer<AccountCreateFormSchema>> } } = $props();

    let open = $state(false);
    const form = superForm(data.form, {
        validators: zodClient(accountCreateFormSchema),
        onResult: ({result}) => {
            // check if submission successful and close dialog
            if (result.type === 'success') {
                open = false;
            }
        }
    });

    const {form: formData, enhance} = form;
</script>

<Card.Root class="w-full">
    <Card.Content class="flex flex-row justify-between items-center p-3 pl-5">
        <span class="text-muted-foreground text-sm">You seem to be missing an account</span>
        <Dialog.Root bind:open>
            <Dialog.Trigger class={buttonVariants({ variant: "default" })}>Add Account</Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>Add Account</Dialog.Title>
                    <Dialog.Description>
                        Add an account to manage your finances
                    </Dialog.Description>
                </Dialog.Header>
                <form method="POST" use:enhance>
                    <Form.Field {form} name="name">
                        <Form.Control>
                            {#snippet children({props})}
                                <Form.Label>Account name</Form.Label>
                                <Input {...props} bind:value={$formData.name}/>
                            {/snippet}
                        </Form.Control>
                        <Form.Description/>
                        <Form.FieldErrors/>
                    </Form.Field>
                    <Dialog.Footer>
                        <Button type="submit">Create</Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    </Card.Content>
</Card.Root>