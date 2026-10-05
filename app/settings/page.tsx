"use client";

import { useRouter } from "next/navigation";
import { ForgeNav } from "../../components/ForgeNav";
import { useForge } from "../../components/ForgeProvider";
import { ProgressControls } from "../../components/ProgressControls";

export default function SettingsPage() {
  const router = useRouter();
  const { data, clearActiveSession, restartOnboarding, dataRecoveryIssue } = useForge();

  return <main className="min-h-screen pb-14"><ForgeNav /><div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-teal-300">Settings</p>
    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Local app controls</h1>
    {dataRecoveryIssue ? <section className="mt-7 border-l-2 border-amber-300 bg-amber-300/10 p-4" role="status"><p className="text-sm font-semibold text-amber-100">Saved data needs recovery.</p><p className="mt-1 text-sm leading-6 text-slate-300">FORGE opened a safe starter view instead. Restore a backup below, or reset local progress when you are ready.</p></section> : null}
    <div className="mt-8 divide-y divide-slate-700 border-y border-slate-700">
      <section className="py-5"><h2 className="font-semibold text-white">Active focus session</h2><p className="mt-2 text-sm text-slate-400">{data.activeFocusSession ? "A focus session is saved on this device." : "No active focus session."}</p>{data.activeFocusSession ? <button type="button" onClick={() => { if (window.confirm("Clear this active session? It will be saved as abandoned without XP.")) clearActiveSession(); }} className="mt-4 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-teal-300">Clear active session</button> : null}</section>
      <section className="py-5"><h2 className="font-semibold text-white">Onboarding</h2><p className="mt-2 text-sm text-slate-400">Revisit your direction and choose a campaign path.</p><button type="button" onClick={() => { restartOnboarding(); router.push("/onboarding"); }} className="mt-4 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-teal-300">Restart onboarding</button></section>
      <ProgressControls />
    </div>
    <p className="mt-5 text-xs text-slate-500">FORGE v0.3.6 Delta · All progress is stored locally in this browser.</p>
  </div></main>;
}
