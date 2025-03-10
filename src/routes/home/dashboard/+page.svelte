<script lang="ts">
  import type { PageData } from "./$types";
  import Expenditures from "./components/Expenditures.svelte";
  import Debts from "./components/Debts.svelte";

  let { data }: { data: PageData } = $props();
  let accountData = data.accountData;
  let acceptedDebts = data.acceptedDebts;
  let user = data.user;

</script>

<div class="flex flex-col w-full m-0">
    <div class="flex flex-row w-full gap-2">
      <div class="flex-[3]">
        <Expenditures
          Expenditures={accountData}
        />
      </div>

      <div class="flex-[3]">
        <div class="w-[100%] mx-auto">
          <Debts
            acceptedDebts={acceptedDebts}
            user={user ?? { id: "", name: "", email: "" }}
          />
        </div>
      </div>
    </div>
</div>