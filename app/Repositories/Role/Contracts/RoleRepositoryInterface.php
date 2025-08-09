<?php

namespace App\Repositories\Role\Contracts;

use App\Repositories\Base\Contracts\QueryableRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface RoleRepositoryInterface extends QueryableRepositoryInterface
{
    /**
     * Get roles by guard
     */
    public function getByGuard(string $guard): Collection;

    /**
     * Get all available guards
     */
    public function getGuards(): array;

    /**
     * Delete multiple roles
     */
    public function deleteMultiple(array $ids): int;
}
