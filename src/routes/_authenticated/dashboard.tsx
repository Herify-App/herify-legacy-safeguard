import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Lock,
  Unlock,
  Plus,
  Users,
  Trash2,
  LogOut,
  Wallet,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/herify-logo.png";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Herify" }] }),
  component: DashboardPage,
});

type Asset = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  asset_type: string;
  value: number | null;
  lock_mode: "time_lock" | "manual";
  unlock_at: string | null;
  status: "locked" | "released";
  created_at: string;
};

type Beneficiary = {
  id: string;
  asset_id: string;
  name: string;
  email: string;
  share_percent: number;
};

function DashboardPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ""));
  }, []);

  const assetsQuery = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Asset[];
    },
  });

  const beneficiariesQuery = useQuery({
    queryKey: ["beneficiaries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("beneficiaries").select("*");
      if (error) throw error;
      return data as Beneficiary[];
    },
  });

  const ownedAssets = useMemo(
    () => (assetsQuery.data ?? []).filter((a) => !userEmail || a.user_id),
    [assetsQuery.data, userEmail],
  );

  const releaseMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("assets")
        .update({ status: "released" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset released");
      qc.invalidateQueries({ queryKey: ["assets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const relockMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("assets")
        .update({ status: "locked" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
    },
  });

  const deleteAssetMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("assets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset deleted");
      qc.invalidateQueries({ queryKey: ["assets"] });
      qc.invalidateQueries({ queryKey: ["beneficiaries"] });
    },
  });

  const handleSignOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/app", replace: true });
  };

  const totalValue = ownedAssets.reduce((sum, a) => sum + (Number(a.value) || 0), 0);
  const lockedCount = ownedAssets.filter((a) => a.status === "locked").length;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
      <header className="relative z-10 border-b border-border/60 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Herify" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold tracking-tight">Herify</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userEmail}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Vault</h1>
            <p className="mt-1 text-muted-foreground">
              Lock assets and assign trusted beneficiaries.
            </p>
          </div>
          <NewAssetDialog />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard icon={Wallet} label="Total assets" value={ownedAssets.length.toString()} />
          <StatCard icon={Lock} label="Locked" value={lockedCount.toString()} />
          <StatCard
            icon={ShieldCheck}
            label="Total value"
            value={totalValue ? `$${totalValue.toLocaleString()}` : "—"}
          />
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">Assets</h2>
          {assetsQuery.isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : ownedAssets.length === 0 ? (
            <Card className="glass-strong">
              <CardContent className="py-12 text-center">
                <Lock className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  No assets yet. Lock your first asset to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {ownedAssets.map((asset) => {
                const benForAsset =
                  beneficiariesQuery.data?.filter((b) => b.asset_id === asset.id) ?? [];
                return (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    beneficiaries={benForAsset}
                    onRelease={() => releaseMutation.mutate(asset.id)}
                    onRelock={() => relockMutation.mutate(asset.id)}
                    onDelete={() => deleteAssetMutation.mutate(asset.id)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Card className="glass-strong">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AssetCard({
  asset,
  beneficiaries,
  onRelease,
  onRelock,
  onDelete,
}: {
  asset: Asset;
  beneficiaries: Beneficiary[];
  onRelease: () => void;
  onRelock: () => void;
  onDelete: () => void;
}) {
  const isReleased = asset.status === "released";
  const isTimeLock = asset.lock_mode === "time_lock";
  const unlockDate = asset.unlock_at ? new Date(asset.unlock_at) : null;
  const timeReached = unlockDate ? unlockDate.getTime() <= Date.now() : false;

  return (
    <Card className="glass-strong overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{asset.name}</CardTitle>
            <CardDescription className="capitalize">{asset.asset_type}</CardDescription>
          </div>
          <Badge variant={isReleased ? "default" : "secondary"} className="gap-1">
            {isReleased ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {isReleased ? "Released" : "Locked"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {asset.description && (
          <p className="text-sm text-muted-foreground">{asset.description}</p>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {asset.value != null && (
            <span className="inline-flex items-center gap-1">
              <Wallet className="h-3 w-3" /> ${Number(asset.value).toLocaleString()}
            </span>
          )}
          {isTimeLock && unlockDate && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Unlocks {unlockDate.toLocaleDateString()}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" /> {beneficiaries.length} beneficiar
            {beneficiaries.length === 1 ? "y" : "ies"}
          </span>
        </div>

        {beneficiaries.length > 0 && (
          <div className="rounded-lg border border-border/60 bg-background/40 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Beneficiaries
            </p>
            <ul className="space-y-1.5">
              {beneficiaries.map((b) => (
                <li key={b.id} className="flex items-center justify-between text-sm">
                  <span>
                    {b.name} <span className="text-muted-foreground">· {b.email}</span>
                  </span>
                  <span className="text-muted-foreground">{b.share_percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <AddBeneficiaryDialog assetId={asset.id} />
          {isReleased ? (
            <Button size="sm" variant="outline" onClick={onRelock}>
              <Lock className="mr-1.5 h-3.5 w-3.5" /> Re-lock
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={onRelease}
              disabled={isTimeLock && !timeReached}
              title={
                isTimeLock && !timeReached ? "Unlock date not reached yet" : "Release asset"
              }
            >
              <Unlock className="mr-1.5 h-3.5 w-3.5" /> Release
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onDelete} className="ml-auto text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NewAssetDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assetType, setAssetType] = useState("crypto");
  const [value, setValue] = useState("");
  const [lockMode, setLockMode] = useState<"manual" | "time_lock">("manual");
  const [unlockAt, setUnlockAt] = useState("");
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");
      const { error } = await supabase.from("assets").insert({
        user_id: userData.user.id,
        name,
        description: description || null,
        asset_type: assetType,
        value: value ? Number(value) : null,
        lock_mode: lockMode,
        unlock_at: lockMode === "time_lock" && unlockAt ? unlockAt : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Asset locked");
      qc.invalidateQueries({ queryKey: ["assets"] });
      setOpen(false);
      setName("");
      setDescription("");
      setValue("");
      setUnlockAt("");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-brand text-white shadow-soft hover:opacity-95">
          <Plus className="mr-2 h-4 w-4" /> Lock new asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lock a new asset</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="a-name">Name</Label>
            <Input
              id="a-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ETH Wallet"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a-type">Asset type</Label>
            <Select value={assetType} onValueChange={setAssetType}>
              <SelectTrigger id="a-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="password">Password / Key</SelectItem>
                <SelectItem value="nft">NFT</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="a-value">Estimated value (USD, optional)</Label>
            <Input
              id="a-value"
              type="number"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a-desc">Description / notes</Label>
            <Textarea
              id="a-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Wallet address, recovery hints, instructions…"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="a-mode">Lock mode</Label>
            <Select value={lockMode} onValueChange={(v) => setLockMode(v as any)}>
              <SelectTrigger id="a-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual release by owner</SelectItem>
                <SelectItem value="time_lock">Time-lock (auto unlock date)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {lockMode === "time_lock" && (
            <div className="space-y-2">
              <Label htmlFor="a-date">Unlock date</Label>
              <Input
                id="a-date"
                type="datetime-local"
                value={unlockAt}
                onChange={(e) => setUnlockAt(e.target.value)}
                required
              />
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-gradient-brand text-white"
            >
              {mutation.isPending ? "Locking…" : "Lock asset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddBeneficiaryDialog({ assetId }: { assetId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [share, setShare] = useState("100");
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");
      const { error } = await supabase.from("beneficiaries").insert({
        asset_id: assetId,
        owner_id: userData.user.id,
        name,
        email,
        share_percent: Number(share),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Beneficiary added");
      qc.invalidateQueries({ queryKey: ["beneficiaries"] });
      setOpen(false);
      setName("");
      setEmail("");
      setShare("100");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Users className="mr-1.5 h-3.5 w-3.5" /> Add beneficiary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add beneficiary</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="b-name">Full name</Label>
            <Input id="b-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b-email">Email</Label>
            <Input
              id="b-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              They'll see this asset when they sign up with the same email.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="b-share">Share (%)</Label>
            <Input
              id="b-share"
              type="number"
              min="1"
              max="100"
              value={share}
              onChange={(e) => setShare(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending} className="bg-gradient-brand text-white">
              {mutation.isPending ? "Adding…" : "Add beneficiary"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}