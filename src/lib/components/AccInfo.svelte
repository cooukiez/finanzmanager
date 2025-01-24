<script lang="ts">
    import {applyAction, enhance} from '$app/forms';
    import {Button, Input, Label} from "flowbite-svelte";
    import {Section} from "flowbite-svelte-blocks";

    export let user;
</script>

<Section name="crudcreateform">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Change Account Info</h2>
    <form
          action="?/userupdate"
          method="POST"

          use:enhance={() => {
                    return ({ update }) => update({ reset: false });
          }}
    >
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
                <Label for="name" class="mb-2">Email</Label>
                <Input type="text" name="newemail" id="name" value={user.email} />
            </div>
            <div class="w-full">
                <Label for="brand" class="mb-2">Username</Label>
                <Input type="text" name="newname" id="brand" value={user.name} />
            </div>
            <div class="w-full">
                <Label for="weight" class="mb-2">Password</Label>
                <Input type="password" name="newpassword" id="weight" placeholder="Password"/>
            </div>
            <Input type="hidden" name="id" value="user.id"></Input>
            <Button formaction="?/update" type="submit" class="w-32">Speichern</Button>
        </div>
    </form>
</Section>
